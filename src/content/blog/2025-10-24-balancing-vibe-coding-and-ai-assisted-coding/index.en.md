---
title: Balancing Vibe Coding and AI-Assisted Coding
slug: balancing-vibe-coding-and-ai-assisted-coding
description: A personal reflection on balancing creativity and discipline in the AI era — finding harmony between Vibe Coding and AI-Assisted Coding.
pubDate: 2025-10-24
tags: ["ai", "opinion", "personal-experience"]
---

## Background

A few moments ago, I wanted to build a simple landing page layout for a specific product for my company.

Normally, I'd open [Vim](https://www.lazyvim.org/), create a new project using [Next.js](https://nextjs.org/)/[Nuxt.js](https://nuxt.com/), set up the project, create files, install dependencies, and start typing line by line. But that day, I decided to try something different.

I try to install, open [Cursor](https://cursor.com/) and typed:

> Create a responsive landing page layout for a SaaS product with a hero section, features section, testimonials, and a call-to-action button. Use Tailwind CSS for styling.

A few seconds later, Cursor generated a complete landing page layout with all the requested sections, styled with Tailwind CSS. I was amazed at how quickly I could get a functional layout without writing a single line of code. I mean, it's just worked.

That was the first time I truly felt what people meant by Vibe Coding. From that moment on, they way I looked at "writing code" changed.

## Coding No Longer Means Typing

For most of my career, writing code was a manual process. But with large language models (LLMs) and AI-powered coding assistants, we no longer have to describe _how_ to do something, we just describe _what_ we want.

I think that's the main point of what Vibe Coding is, as described by [Andrej Karpathy's tweet](https://x.com/karpathy/status/1886192184808149383) and [Addy Osmani](https://addyosmani.com/) in [his book](https://www.amazon.com/Beyond-Vibe-Coding-Leveraging-AI-Assisted/dp/B0F6S5425Y):

> It's not about giving instructions, but about expressing intent.

We might say:

> I want the button to be blue with smooth hover animation and centered on the page.

And AI will writes the implementation for us. **We start thinking in outcomes rather than syntax** as developers.

## The Reality

After got the excitement of Vibe Coding, I thought:

> What happen if we bring this approach into a real team project? Especially when working with other developers in a large scale web application?

I tried. And.. I got a messy code with something that I couldn't understand later. It created more work for me and my team to review, refactor and fix the code to match with our standards and company guidelines.

That's when I realized that Vibe Coding is great for exploration, prototyping, and generating ideas quickly. But when it comes to production code, especially in a large team, we still need to apply discipline, best practices, and code reviews to ensure maintainability and quality.

That's what I called it: AI-Assisted Coding.

## Vibe Coding vs AI-Assisted Coding

| Aspect               | **Vibe Coding**                                                       | **AI-Assisted Coding**                                                                                    |
| :------------------- | :-------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **Core Idea**        | Programming by _intent_ — describe what you want, and AI builds it.   | Programming with _assistance_ — you still code, AI helps improve or accelerate to write the boring stuff. |
| **Primary Goal**     | Rapid exploration and creative prototyping.                           | Reliable, structured implementation for production.                                                       |
| **Control Level**    | Low control; AI decides many implementation details.                  | High control; developer drives design and structure.                                                      |
| **Best Use Cases**   | Brainstorming, mockups, dummy landing pages, quick proofs of concept. | Production code, refactoring, debugging, writing tests, work with large teams.                            |
| **Developer’s Role** | _Designer of intent_ — focuses on ideas, outcomes, and iteration.     | _Engineer of systems_ — focuses on logic, architecture, structure, and reliability.                       |
| **Learning Curve**   | Low entry barrier — good for beginners or ideation.                   | Requires strong coding foundation and understanding of tools.                                             |
| **Mindset**          | “Let’s see what happens.”                                             | “Let’s make this solid, and maintainable.”                                                                |

## Finding the Balance

Over time, I found a practice that fits me, and maybe it’ll work for you too.

### 1. Vibe Coding for exploration and starter

When I want to prototype or experiment with a new concept, I let the AI "improvise."
I use ChatGPT, Claude Code or Cursor to craft an idea quickly.

### 2. Switch to AI-Assisted Coding for implementation

Once I have a solid direction, I move to Vim to refine the code manually or ask AI to write the code for me but by following my instructions for the implementation details.

Make the AI to help to write the boring stuff, an we keep the control of the architecture, design patterns, and overall quality.

### 3. Stay become the curator

AI can generate hundreds of lines in seconds, but you are responsible for the quality.

Always review: Is this code efficient? Secure? Understandable to others?

This pattern keeps me creative without losing control.

## Conclusion

Whenever I prompt an AI, I remind myself that my goal isn't only to write less code, but to keep understand what happened with my code.

I won't always use the "Auto Accept" button make the decisions for the crucial parts. Don't commit and ship the code you don't understand. Balance the freedom of Vibe Coding with the discipline of AI-Assisted Coding.

Start with a basic implementation using Vibe Coding approach, then progressively refine it through follow-up requests.

As Addy Osmani said:

> Vibe Coding isn’t an excuse to ship a low quality work. It’s should be a start of a solution. Not the end.

Keep experimenting. Keep thinking critically.

Thank you for reading 👋
