---
title: Set Minimum Browser Versions for Your Site
slug: set-minimum-browser-versions-for-your-site
description: Why I think setting the minimum browser to be supported is crucial
category: blog
featured: cover.jpg
lang: en
---

<img src="cover.jpg" alt="Set Minimum Browser Versions for Your Site" />

<p align="center"><small><span>Original Photo by <a href="https://unsplash.com/photos/logo-JySoEnr-eOg?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash" target="_blank" rel="noopener">Denny Müller</a></span></small></p>


## Table Of Contents

```toc

```


## Background

It’s been more than 1 year since my team and I [decided on the minimum supported browsers to be supported in Mamikos Web](https://medium.com/mamitech/deciding-the-minimum-browser-versions-to-be-supported-in-mamikos-com-e493d2d04caf). 
We’ve relied on that data to help us determine whether some new features are ready to be used. 
I admit it’s annoying to update the data regularly, but it’s worth the effort.

## Why should you care

Deciding the minimum browser is crucial, and I’d tell any team to consider having it. I have a bunch of reasons why you should consider it:

### New web features guideline

How many times you, as a web developer couldn’t decide to use new web features, because worrying that it won’t work from the user’s browser? For me, it’s too often.

Before having a clear minimum browser data, we were not sure whether it was safe to use CSS Grid, and we never knew the answer. It’s just an example, there are tons of new web technology features out there but we didn’t have any confidence to use them because we were afraid our website would be broken on some old browsers.

### Avoid transpiling useless code

Transpilation is the practice of transforming modern code into traditional code. Transpiling code to ES5 has been a common practice in web engineering since 2015 with the hope of supporting older browsers and making our web apps usable as broadly as possible. Today is 2024 and it’s almost 10 years since then, do we need to transform our code to ES5?

It’s hard to tell unless we have the data.

### Avoid putting useless Polyfill 

Polyfill is a piece of code used to provide modern functionality on older browsers that do not natively support it. Putting them without any clear direction into our web apps could bloat our JavaScript file size and impact the performance since the decision is based on the assumption.

### Clear direction for QA / Testers

QA / Testers would have a clear direction on which browser version to be supported, so the website has a chance to be more stable on those targeted browsers.

### Unsupported browser alert 

Putting an unsupported browser alert might seems not cool to our site, but it’s way better than letting our users experience broken features without them knowing why.

Imagine you ship a new syntax to the production and your site’s broken from the user’s end because their browser is outdated. If you have the unsupported browser alert, they’d be aware to update their browser to experience the best version of our web app.

## How to decide them

Now we know how important it is, then how to decide them? There are several methods to get this: 

### Analyze your website’s visitors

The simplest way to decide is by analyzing your target users’ behavior and the browsers they commonly use. Tools like Google Analytics can provide detailed insights into what browsers and versions your visitors use most. This is my preferred and main method to decide in my company though.

### Follow Baseline 

[Baseline](https://web.dev/baseline) is an initiative from [WebDX Community Group](https://www.w3.org/community/webdx/) to help developers easily identify features that are stable and well-supported by all major browsers. Read more about it here.

Baseline is a really great choice in case you don’t have analytics installed on your site and you want to rely on global data. The drawback from it is it’s relatively new, hence not all features have a Baseline label yet. 

### Follow the framework requirement

If you’re using a framework to build your site, most of them should have shared their minimum supported browsers on their documentation like [what Next.js has](https://nextjs.org/docs/architecture/supported-browsers) for instance. This could be the easiest way to know your supported browsers.

## Conclusion 

Whatever your methods to decide the minimum supported browser is up to you and make sure to decide it according to your target users.

I also suggest putting an unsupported browser alert the older browsers. By having it, we can warn the users if there is a possibility some features won’t work properly until they update their browsers.
