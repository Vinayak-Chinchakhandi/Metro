root structure
```

Metro
│
├── frontend
├── backend
├── ai-service
├── database
├── datasets
├── docs
└── README.md

```


Frontend
```
frontend
│
├── public
│   └── index.html
│
├── src
│   │
│   ├── components
│   │   ├── Navbar.jsx
│   │   ├── TicketForm.jsx
│   │   ├── QRDisplay.jsx
│   │   ├── StationCard.jsx
│   │   ├── FraudAlertCard.jsx
│   │   └── PredictionCard.jsx
│   │
│   ├── pages
│   │   ├── Home.jsx
│   │   ├── BookTicket.jsx
│   │   ├── TicketResult.jsx
│   │   ├── Dashboard.jsx
│   │   └── NetworkMap.jsx
│   │
│   ├── services
│   │   ├── api.js
│   │   ├── ticketService.js
│   │   ├── fraudService.js
│   │   └── predictionService.js
│   │
│   ├── hooks
│   │   └── useTicket.js
│   │
│   ├── utils
│   │   ├── constants.js
│   │   └── helpers.js
│   │
│   ├── styles
│   │   └── global.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── tailwind.config.js
```


Backend
```
backend
│
├── src
│   │
│   ├── controllers
│   │   ├── ticketController.js
│   │   ├── stationController.js
│   │   ├── fraudController.js
│   │   └── predictionController.js
│   │
│   ├── routes
│   │   ├── ticketRoutes.js
│   │   ├── stationRoutes.js
│   │   ├── fraudRoutes.js
│   │   └── predictionRoutes.js
│   │
│   ├── services
│   │   ├── ticketService.js
│   │   ├── aiService.js
│   │   └── qrService.js
│   │
│   ├── models
│   │   ├── ticketModel.js
│   │   ├── stationModel.js
│   │   ├── fraudModel.js
│   │   └── predictionModel.js
│   │
│   ├── config
│   │   ├── database.js
│   │   └── env.js
│   │
│   ├── middleware
│   │   ├── errorHandler.js
│   │   └── logger.js
│   │
│   ├── utils
│   │   └── qrGenerator.js
│   │
│   └── app.js
│
├── server.js
├── package.json
└── .env
```

AI service
```
ai-service
│
├── app
│   │
│   ├── api
│   │   ├── demand_prediction.py
│   │   └── fraud_detection.py
│   │
│   ├── models
│   │   ├── demand_model.pkl
│   │   └── fraud_model.pkl
│   │
│   ├── training
│   │   ├── train_demand_model.py
│   │   └── train_fraud_model.py
│   │
│   ├── preprocessing
│   │   └── data_cleaning.py
│   │
│   ├── schemas
│   │   └── prediction_schema.py
│   │
│   └── main.py
│
├── requirements.txt
└── README.md
```

Database
```
database
│
├── metro.db
│
├── migrations
│   └── init_schema.sql
│
└── seeds
    └── seed_stations.sql
```

Dataset
```
datasets
│
├── raw
│   ├── passenger_flow.csv
│   └── fraud_cases.csv
│
└── processed
    ├── demand_dataset.csv
    └── fraud_dataset.csv
```

Docs
```
docs
│
├── architecture.md
├── api-spec.md
├── dataset-description.md
└── demo-script.md
```