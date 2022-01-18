# MedPiper Blogs

MedPiper Blogs is a web application build On NextJs. With NextJs it uses Wordpress Rest Api v2 for data of each blogs 

MedPiper Have following TechStack 
* [NextJs](https://www.npmjs.com/package/next)
* [tailwind Css](https://www.npmjs.com/package/tailwindcss)
* [react-html-parser](https://www.npmjs.com/package/react-html-parser)
* [axios](https://www.npmjs.com/package/axios)
* [react-content-loader](https://www.npmjs.com/package/react-content-loader)

## Installation

Use the package manager Yarn to install MedPiperBlogs dependencies.

```bash
yarn install
```

## Build

```bash
yarn build
```
All of the Blog Posts as SSG(Static Site Generation) thats why build will take some minute to be done 

## RUN

```bash
yarn run start
```

## OverView

MedPiperBlogs have Following Page
* /
* /post/{slug}
* /author/{slug}

Whole Application is wrapped in Layout which is Header, Body and Footer

# Header  

Header Consist of Search bar which make searches using Wordpress Global search functionality. Search Api's are **debounced**. User can navigate to Blog post using Search Result

# Body
### Index Page ###
Index Page ('/') path have Hero Post which is the latest blogs present followed by More stories which is an **Infinite Scroll** Section.
**PostSkeleton** (Shimmer) will be displayed while loading new blog posts 

### Blog Post Page ###
Access using path /path/{slug} contains content provided by Wordpress Api Followed by More Stories which is an **Infinite Scroll** Section.
**PostSkeleton** (Shimmer) will be displayed while loading new blog posts 

Blog Post is an Incremental Static Generation which mean any blog post which is not SSG will make First use wait to generate static page and later will be served to other user on request

Each Deployment will create Static page for all of the blog present

### Author Page ###
Access using path /author/{slug} contains Information of Author Followed by Author Stories which is an **Infinite Scroll** Section.
**PostSkeleton** (Shimmer) will be displayed while loading new Author blog posts 

Author Page is an Incremental Static Generation which mean any blog post which is not SSG will make First use wait to generate static page and later will be served to other user on request

Each Deployment will create top 100 Author page

# Performance

Medpiper blogs is build using best practice and keeping all Performance matrix in mind 

Best Registered result using Light house is 

## Mobile ##
* Perfomance : **100** 
* Best Practises : **100** 
* SEO : **100** 
* Accessibility : **90** 

## Desktop ##
* Perfomance : **100** 
* Best Practises : **100** 
* SEO : **100** 
* Accessibility : **89** 

You can Access Medpiper Blogs using this [Link](https://medpiper-blogs.vercel.app/) 

