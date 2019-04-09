import { useContext } from 'react'
import { getControls } from './utils'
import { WizardContext } from "./Wizard";

export const useControls = () => {
  const {  setStep, tree = {}, step = "", treeKeys, middleware } = useContext(WizardContext)
  return getControls(tree, step, treeKeys, setStep, middleware)
}

export const useWizardContext = () => useContext(WizardContext)