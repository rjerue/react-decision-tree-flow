import { useContext } from 'react'
import { getControls } from './utils'
import { WizardContext } from "./Wizard";

export const useControls = () => {
  const {  setStep, tree = {}, step = "", treeKeys } = useContext(WizardContext)
  return getControls(tree, step, treeKeys, setStep)
}

export const useWizardContext = () => useContext(WizardContext)