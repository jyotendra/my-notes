After struggling by searching over internet n trying to understand what exactly problem and trying different troubleshooting option, I came to know baseUrl and Path how works together

Note: This solution is for Angular Cli 1.x . Not sure about other tool,

If you use baseUrl:"." like below it works in VScode but not while compiling

{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "baseUrl": ".",
    "paths": {
      "@myproject/*": ["src/app/*"]
    }    
}
As far my understanding and my working app and checked in angular aio code, I suggest use as baseUrl:""src like below

{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "baseUrl": "src",
    "paths": {
      "@myproject/*": ["app/*"],
      "testing/*": ["testing/*"]
    }    
}
By having base URL as source(src directory), compiler properly resolves modules.

I hope this helps to people resolve this kind of issue.