declare module '*.mdx' {
  import { ComponentType } from 'react';
  
  const component: ComponentType<any>;
  export default component;
}

declare module '*.md' {
  import { ComponentType } from 'react';
  
  const component: ComponentType<any>;
  export default component;
}
