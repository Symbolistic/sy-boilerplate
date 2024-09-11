export const plans = [
    {
        link:
            process.env.NODE_ENV === 'development'
                ? 'https://buy.stripe.com/test_7sI2934G7a684xi28a'
                : '',
        priceId:
            process.env.NODE_ENV === 'development'
                ? 'price_1PwfgVAyxVvYYYC6kVno4R39'
                : '',
        price: 19,
        duration: '/month',
    },
    {
        link:
            process.env.NODE_ENV === 'development'
                ? 'https://buy.stripe.com/test_aEUeVP0pRa684xi5kp'
                : '',
        priceId:
            process.env.NODE_ENV === 'development'
                ? 'price_1Pwfh7AyxVvYYYC6LhDmLAra'
                : '',
        price: 49,
        duration: '/month',
    },
    {
        link:
            process.env.NODE_ENV === 'development'
                ? 'https://buy.stripe.com/test_00gdRL2xZ9248NycMT'
                : '',
        priceId:
            process.env.NODE_ENV === 'development'
                ? 'price_1PwfheAyxVvYYYC60mw1Pi6K'
                : '',
        price: 99,
        duration: '/year',
    },
];
