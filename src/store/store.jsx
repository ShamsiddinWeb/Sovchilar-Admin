import { create } from "zustand";
import { persist } from 'zustand/middleware';

export const useStore = create(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,

      // User va tokenlarni saqlash
      setUser: (userData, accessToken, refreshToken) =>
        set({
          user: userData,
          accessToken: accessToken,
          refreshToken: refreshToken,
        }),

      // Tokenlarni yangilash
      updateTokens: (newAccessToken, newRefreshToken) =>
        set({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        }),

      // Hammasini tozalash
      clearUser: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
        }),
    }),
    {
      name: 'user-store-aqvo', // LocalStorage kaliti
      getStorage: () => localStorage, // LocalStorage orqali saqlash
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
      }),
    }
  )
);
