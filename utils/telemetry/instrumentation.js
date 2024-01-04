/*instrumentation.ts*/
const opentelemetry = require('@opentelemetry/sdk-node')
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-grpc')

const { Resource, processDetector, hostDetector} = require('@opentelemetry/resources');
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions');

const resource = Resource.default().merge(new Resource({
  [SemanticResourceAttributes.SERVICE_NAME]: "frontend",
  [SemanticResourceAttributes.SERVICE_VERSION]: "1.0.0",
  [SemanticResourceAttributes.DEPLOYMENT_ENVIRONMENT]: "local",
}));
const resourceDetectors = [processDetector, hostDetector];

const exporter = new OTLPTraceExporter({
  url: "http://aws-ot-collector:4317/v1/traces",
  headers: {}
});

const instrumentations = [
  getNodeAutoInstrumentations({
    '@opentelemetry/instrumentation-fs': {
    requireParentSpan: true,
    },
  })
];

const sdk = new opentelemetry.NodeSDK({
  traceExporter: exporter,
  instrumentations: instrumentations,
  resource: resource,
  resourceDetectors: resourceDetectors
});
sdk.start();
