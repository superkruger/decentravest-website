// const axios = require('axios').default

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const fetchVolume = async () => {
	let totalVolume = new BigNumber(0)
	try {
    	const response = await axios.get('https://api.dydx.exchange/v1/stats/markets')
        const markets = response.data.markets

        const keys = Object.keys(markets)
        let total = new BigNumber(0)

        let volume = keys.reduce((total, key) => {
        	let market = markets[key]
        	return total.plus(new BigNumber(market.usdVolume))
        }, 0)

        totalVolume = totalVolume.plus(volume)

        // console.log("dydx volume", volume.toString())
    
   } catch(error) {
   	 console.error(error)
   }

   try {
    	const response = await axios.get('https://api.dmex.app/api/futures/stats')


        let volume = new BigNumber(response.data.data.volume_24h)
  		volume = volume.dividedBy(10**8)
        // console.log("dmex volume 2", volume.toString())

        totalVolume = totalVolume.plus(volume)

    
   } catch(error) {
   	 console.error(error)
   }

   totalVolume = formatter.format(totalVolume.toNumber())

   

   return totalVolume
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