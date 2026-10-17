import {
  siPython, siJavascript, siCplusplus, siTerraform,
  siVuedotjs, siThreedotjs, siPlatformio,
  siDocker, siGit, siGithub,
} from 'simple-icons'
import { genericCloud } from './icons'

// 小見出しは英語、中身は技術名(README に載っている使用技術から)
export const skillGroups = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', icon: siPython },
      { name: 'JavaScript', icon: siJavascript },
      { name: 'C++ (Arduino)', icon: siCplusplus },
      { name: 'HCL (Terraform)', icon: siTerraform },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    items: [
      { name: 'Vue.js 3', icon: siVuedotjs },
      { name: 'Three.js', icon: siThreedotjs },
      { name: 'PlatformIO', icon: siPlatformio },
    ],
  },
  {
    title: 'Tools & Infrastructure',
    items: [
      { name: 'AWS', icon: genericCloud },
      { name: 'Terraform', icon: siTerraform },
      { name: 'Docker', icon: siDocker },
      { name: 'Git', icon: siGit },
      { name: 'GitHub', icon: siGithub },
    ],
  },
]
