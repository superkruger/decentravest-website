// const axios = require('axios').default

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const fetchVolume = async () => {
	try {
    	const response = await axios.get('https://api.dydx.exchange/v1/stats/markets')
        const markets = response.data.markets

        const keys = Object.keys(markets)

        let totalVolume = keys.reduce((total, key) => {
        	let market = markets[key]
        	return total + parseInt(market.usdVolume)
        }, 0)

        totalVolume = formatter.format(totalVolume)

        // console.log("totalVolume", totalVolume)

        return totalVolume
    
   } catch(error) {
   	 console.error(error)
   }
   return ""
}

const showVolume = async () => {
	let volume = await fetchVolume()
	// console.log("volume", volume)
  	let volumeContainer = $('#tradingvolume')
  	console.log(volumeContainer)
  	volumeContainer.html(volume)
}

!(function($) {
  "use strict";

  // $(document).ready(function() {
  //   console.log("document ready")
  // });

  $(window).on('load', function() {

  	showVolume()
  });

})(jQuery);