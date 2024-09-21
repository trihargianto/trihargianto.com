import * as Sentry from "@sentry/gatsby";

const isProduction = process.env.NODE_ENV === "production";
const isSentryDsnSet = !!process.env.GATSBY_SENTRY_DSN;

if (isSentryDsnSet && isProduction) {
  Sentry.init({
    dsn: process.env.GATSBY_SENTRY_DSN,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    tracesSampleRate: Number(process.env.GATSBY_SENTRY_TRACES_SAMPLE_RATE) || 0.1,

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    replaysSessionSampleRate: Number(process.env.GATSBY_SENTRY_REPLAYS_SESSIONS_SAMPLE_RATE) || 0.1,
    replaysOnErrorSampleRate: Number(process.env.GATSBY_SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE) || 0.1,
  });
}
