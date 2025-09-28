import { useAtom } from "jotai"
import { atomWithStorage } from "jotai/utils"

export const atomHiScore = atomWithStorage("sf.hiscore", 0)
export const useHiScoreAtom = () => useAtom(atomHiScore)
