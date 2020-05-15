module.exports = {
    /**/
    /*

     getRandomInRange

     NAME

       getRandomInRange - gets a random number in given range

     SYNOPSIS

        getRandomInRange(from, to, fixed)
            from -> range from
            to -> number, range to
            fixed -> number of numbers after decimal point

     DESCRIPTION

        Gets a random number in specified range

     RETURNS

        Random number

     AUTHOR

        Ashmin Bhandari

     DATE

        05/14/2020

     */
    /**/
    getRandomInRange(from, to, fixed) {
        return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    }
};