import React from "react";
import "./AboutCards.css"; // We'll create this file in the next step

const AboutCards = () => {
    return (
        <div className="about-cards-container">
            <div className="about-card">
                <h2>Our Mission</h2>
                <p>
                    At MarketMaven, our mission is to empower investors with actionable
                    and reliable financial intelligence. We strive to demystify the
                    complexities of the financial markets and offer clear, data-driven
                    insights that lead to profitable investment strategies. Our commitment
                    to accuracy and transparency is the cornerstone of our success.
                </p>
            </div>

            <div className="about-card">
                <h2>What Sets Us Apart</h2>
                <p>
                    <b>Advanced Data Analytics:</b> We harness the power of advanced data
                    analytics and machine learning algorithms to uncover hidden patterns
                    and trends in financial data, giving our clients a competitive edge in
                    the market.
                </p>
                <p>
                    <b>Real-time Market News:</b> Our platform aggregates and analyzes
                    real-time market news from multiple sources to provide up-to-the-minute
                    insights on market-moving events and developments.
                </p>
                <p>
                    <b>Sentiment Analysis:</b> Through our state-of-the-art sentiment analysis
                    tools, we decode the sentiment of news and social media data, enabling
                    investors to gauge market sentiment and anticipate potential shifts.
                </p>
            </div>

            <div className="about-card">
                <h2>Our Services</h2>
                <p>
                    <b>Market Insights:</b> Stay ahead of market trends with our comprehensive
                    market insights, covering stock movements, sector performance, and
                    macroeconomic indicators.
                </p>
                <p>
                    <b>Sentiment Analysis:</b>  Assess market sentiment and gauge
                    public perception of companies, sectors, and market events using
                    our advanced sentiment analysis tools.
                </p>
                <p>
                    <b>Investment Recommendations: </b> Benefit from our data-driven
                    investment recommendations, designed to match your risk appetite
                    and investment objectives.
                </p>
            </div>
        </div>
    );
};

export default AboutCards;
