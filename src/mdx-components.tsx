import { components } from '@/components/mdx';
import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(defaultComponents: MDXComponents): MDXComponents {
  return {
    ...components,
    ...defaultComponents,
  }
}