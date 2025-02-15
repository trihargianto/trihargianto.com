---
title: How to Analyze Browser Visitors with Google Analytics 4
slug: how-to-analyze-browser-visitors-with-google-analytics-4
description: Learn how to analyze browser visitors using Google Analytics 4. This step-by-step guide help us to decide the browser we should focus on when developing our site.
featured: cover.jpg
featuredSource: Google
featuredSourceUrl: https://www.google.com/analytics
pubDate: "2024-09-26"
tags: ["how-to"]
---

## Preface

In this article, I will show you how you can analyze your browsers’ visitors with Google Analytics 4.

To follow this article, I would assume you’ve installed Google Analytics to your site, if you haven’t, then you can follow this instruction → [[GA 4] Set up Analytics for a website](https://support.google.com/analytics/answer/9304153?hl=en#zippy=%2Cadd-the-google-tag-directly-to-your-web-pages).

## Analyzing Browser Vendor

Visitor’s browser vendor information could help us to decide the browser vendor we should focus on when developing our site. To access the data, open your [Google Analytics Dashboard](https://analytics.google.com), then go to “Reports” → “Tech” → “Tech Details” menu:

![Browser Vendor](images/browser-vendor.png)

The report shows how many users with specific browsers had accessed our site within the specified date range. I’d suggest to filter the data for at least 90 days. Unfortunately, the report doesn’t provide information about the browser version. Thus, the report isn’t reliable enough.

## Analyzing Browser Versions

[Another way](https://stackoverflow.com/questions/68256046/browser-version-dimension-missing-in-ga4-api/68286131#68286131) to gather the user’s browser version data is via the Exploration Menu. We could only access the last 90 days’ data from this menu, but that’s enough.

### Step 1: Open the Exploration Menu

Open the “Explore” menu from the left sidebar, and then click on the “Create a new exploration” menu.

![Open the exploration menu](images/step-1-exploration-menu.png)

### Step 2: Open the Dimensions menu

Click on the “+” icon next to the “DIMENSIONS”. After you click it, a “Select dimensions” popup will appear.

![Open the dimension menu](images/step-2-open-the-dimension-menu.png)

### Step 3: Select the dimensions

Select the dimensions by searching and selecting the “Browser”, “Browser version”, and “Operating System” checkbox. After those three has been selected, click the “Confirm” button:

![Select the dimensions](images/step-3-select-the-dimensions.png)

### Step 4: Open the “Metrics” menu

Click on the “+” icon next to the “METRICS”. After you click it, a “Select metrics” popup would be appeared.

![Open the metrics menu](images/step-4-open-the-metrics-menu.png)

### Step 5: Select the Metrics

Select the metrics by searching and selecting the “Total Users” checkbox. After that, click the “Confirm” button:

![Select the metrics](images/step-5-select-the-metrics.png)

“Total users” would be enough in this case, you can repeat the above process and select the metrics you want to use in your report though.

### Step 6: Select the dimensions for the report

Click the "Drop or select dimension" button:

![Select the dimensions for the report](images/step-6-select-the-dimensions-for-report.png)

After that, make sure you choose “Browser”, “Browser version”, and “Operating System”:

![Select the dimensions for the report](images/step-6-select-the-dimensions-for-report-2.png)

### Step 7: Select the metrics for the report

The last thing to to is selecting the metrics for the report from the “Values” option:

![Select the metrics for report](images/step-7-select-the-metrics-for-report.png)

### Step 8: Analyze the report

At this point, you should see your site’s visitor’s browser version report. You could customize the Dimensions, Metrics, and also the date range for your report:

![Analyze the report](images/step-8-analyze-the-report.png)

## Conclusions

Analyzing your site visitor’s browser version should be done regularly. I’d suggest doing this at least quarterly.
