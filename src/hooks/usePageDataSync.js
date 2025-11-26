import { useEffect, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import pagesAPI from "../lib/pagesAPI";

// Hook للتحديثات المباشرة للصفحات بعد تغيير Admin
export const usePageDataSync = () => {
  const queryClient = useQueryClient();

  // تحديث البيانات بناءً على تغييرات Admin
  const syncPageData = useCallback(
    async (endpoint) => {
      console.log(` Syncing page data for: ${endpoint}`);

      try {
        // Clear the cache completely for this endpoint
        queryClient.removeQueries(["pageData", endpoint]);

        // Force a fresh fetch using the new API
        await queryClient.prefetchQuery({
          queryKey: ["pageData", endpoint],
          queryFn: async () => {
            // Try to find the page by slug/endpoint name
            const searchResults = await pagesAPI.searchPages(endpoint);
            const foundPage = searchResults.find(
              (page) => page.slug === endpoint
            );

            if (!foundPage) {
              // Fallback to getting all pages and finding by slug
              const allPages = await pagesAPI.getPages();
              const pageMatch = allPages.find((page) => page.slug === endpoint);
              if (pageMatch) {
                return await pagesAPI.getPageById(pageMatch.id);
              }
              throw new Error(`Page not found: ${endpoint}`);
            }

            return await pagesAPI.getPageById(foundPage.id);
          },
          staleTime: 0,
          cacheTime: 0, // Don't cache
        });

        // Invalidate all related queries
        queryClient.invalidateQueries(["pageData", endpoint]);

        console.log(` Page data synced for: ${endpoint}`);
        return true;
      } catch (error) {
        console.error(` Failed to sync page data for ${endpoint}:`, error);
        return false;
      }
    },
    [queryClient]
  );

  // تحديث جميع البيانات
  const syncAllPageData = useCallback(async () => {
    console.log(" Syncing all page data...");

    try {
      // Clear all page data cache
      queryClient.removeQueries(["pageData"]);

      // Wait a bit for cache clearing
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Get all pages from the API instead of hardcoded endpoints
      const allPages = await pagesAPI.getPages();

      // Force refresh each page
      const results = await Promise.allSettled(
        allPages.map((page) => syncPageData(page.slug))
      );

      const successCount = results.filter(
        (r) => r.status === "fulfilled" && r.value
      ).length;
      console.log(` Synced ${successCount}/${allPages.length} pages`);

      return successCount === allPages.length;
    } catch (error) {
      console.error(" Failed to sync all page data:", error);
      return false;
    }
  }, [queryClient, syncPageData]);

  return {
    syncPageData,
    syncAllPageData,
  };
};

// Hook للاستماع لتغييرات الملفات
export const useFileChangeWatcher = () => {
  const { syncPageData } = usePageDataSync();

  // مراقبة تغييرات db.json
  const watchFileChanges = useCallback(() => {
    // في بيئة production يمكن استخدام WebSocket أو SSE
    // للآن سنستخدم polling بسيط
    const interval = setInterval(async () => {
      try {
        // فحص آخر تعديل على db.json
        const response = await fetch("http://localhost:3001/db");
        if (response.ok) {
          // تم العثور على تغيير، قم بتحديث كل البيانات
          console.log(" File change detected, syncing data...");
          // يمكن تحسين هذا لتحديد الـ endpoint المحدد فقط
        }
      } catch (error) {
        // تجاهل الأخطاء في polling
      }
    }, 2000); // فحص كل ثانيتين

    return () => clearInterval(interval);
  }, []);

  return {
    watchFileChanges,
  };
};
