
# Shipping Quote App

This project is a freight calculator that consumes the Frenet API to estimate shipping costs from one CEP code to another. It considers essential shipping details such as weight, dimensions, and product value. By integrating with Frenet, the system retrieves accurate freight rates, providing users with a seamless and efficient way to calculate shipping costs for their products.

[View Project On-line](https://frenet-test.vercel.app/)

## Features

- Freight Cost Calculation
- Shipping Options Retrieval
- Real-Time Shipping Quotes
- Package Details Validation


## Prerequisites

### Step 1: Clone the Repository

```bash
  git clone https://github.com/heitorschleder/shipping-quote-app
```

### Navigate to the project directory:

```bash
  cd shipping-quote-app
```

### Step 2: Install Dependencies

```bash
  npm install
```
or 

```bash
  yarn install
```

### Step 3: Configure Environment Variables
create a .env file in the root directory and add the required variables. For example:

```bash
  VITE_TOKEN_CODE=your_api_key_here
  VITE_API_URL=https://api.example.com
```

### Step 4: Run the Development Server
Start the development server to preview the project locally:


```bash
  npm run serve
```
Once the server is running, you can access the app in your browser at:
```bash
  http://localhost:5173
```
## Stack 

**Front-end:** 
``` 
Vue
Pinia
Vite
Tailwind
Vercel
``` 

## Authors

- Dev Front-End: [@heitorschleder](https://github.com/heitorschleder)
- API: [Frenet](https://www.frenet.com.br/)