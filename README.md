# Paikari 

Paikari India is a web-based application designed to provide users with real-time grocery price comparisons across the top 5 cities in India. Users can search for specific grocery items and instantly view the current prices in cities like Mumbai, Delhi, Bangalore, Chennai, and Kolkata. Bengali: পাইকারি (paikari) translates to "wholesale" in English

## Features

- Real-time price comparison across major Indian cities
- Search functionality with autocomplete
- Dynamic price updates
- City-based filtering
- Optional user accounts for saving preferences
- Mobile responsive design

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, ShadCN UI
- **Backend:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Deployment:** Vercel

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-repo/paikari-india.git
cd paikari-india
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file with the following:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
The displayed data is sourced from the [data.gov.in](https://data.gov.in) open-source platform. Human errors can occasionally occur at source, which means that the displayed prices may sometimes be inaccurate.
