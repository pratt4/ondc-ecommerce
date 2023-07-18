import { create } from "zustand";
import { dataStore } from "./data";
import { immer } from "zustand/middleware/immer";
import { devtools, persist } from "zustand/middleware";

const useStore = create(
  devtools(
    persist(
      immer((set) => ({
        ...dataStore(set),
      })),
      {
        name: "state",
      }
    )
  )
);

export { useStore };
