# jonohash

this is a fork of hashnode's [starter kit](https://github.com/Hashnode/starter-kit#readme)

## setup simplified

this procedure assumes that: 
- you already have a [hashnode](https://hashnode.com) account and blog
- you already have a [vercel](https://vercel.com) account to host the front-end
- you know how to use the command-line terminal on your computer

### vercel

* fork this repo
* add a new project on [vercel](https://vercel.com) 
* connect the forked repo (jonohash)
* choose the following for the "root directory"
  * starter-kit
    * packages
      * blog-starter-kit
        * themes
          * jonohash
* set the environment variables

```
NEXT_PUBLIC_HASHNODE_GQL_ENDPOINT=https://gql.hashnode.com
NEXT_PUBLIC_HASHNODE_PUBLICATION_HOST=yoursite.hashnode.com
NEXT_PUBLIC_MODE=production
NEXT_PUBLIC_BASE_URL=/blog -> remove this line if just installing on root
```

* let it deploy!

### local machine

* go to an empty folder 
* clone this repo `git clone https://github.com/joncoded/jonohash.git .`
* `cd packages/blog-start-kit/themes/jonohash` 
* copy the above `NEXT_PUBLIC...` environment variables (with modified values) to .env.local on the `../themes/jonohash` folder
* `npm install pnpm` (if not already)
* `pnpm install`
* `pnpm dev`
* go to [http://localhost:3000](http://localhost:3000)

### re-deployment

* commit and push all new code: `git push origin main`
* vercel will automatically re-deploy on the vercel URL!