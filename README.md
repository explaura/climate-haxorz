# Trend Hack Day - ECTree

Haxcking the Climxate, one idle EC2 instance at a time.

## Brief

Trend Micro hackathon aimed at addressing challenges faced by our industry (Cloud or Security/Governance).

At the conclusion of the event, all teams will have a 5-minute opportunity to pitch and/or Demo their project to the judging panel - with winners decided, by the judges, on the basis of:
- Coolness
- Realistic Capability (does it work, or is it likely to work)
- Innovativeness
- Business Value (does it solve a relevant problem)

## API

Request parameters:
- EC2 region
- EC2 instance type
- EC2 uptime

Response:
```json
{
  "manufacturing": 1.8,
  "running": {
    "idle": 0.5,
    "tenPercent": 0.8,
    "fiftyPercent": 1.3,
    "hundredPercent": 1.8
  },
  "treesToPlant": {
    "idle": 0.5,
    "tenPercent": 0.6,
    "fiftyPercent": 0.7,
    "hundredPercent": 0.8
  },
  "ecoProfile": {
    "title": "Captain Planet",
    "recommendations": [
      "Eat some spinach whilst coding.",
      "Pet your cat 50 times after a blue-green deployment.",
      "Take computer breaks to rest your eyes."
    ]
  }
}
```

Sample cURL request:
```bash
curl -vv -H "Content-Type: application/json" \
'https://instance-id.execute-api.region.amazonaws.com/v1/ec2-carbon-footprint?region=us-west-2&instanceType=a1.medium&uptime=3'
```