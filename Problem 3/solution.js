class Datasource {
  mid(x, y) {
    return (x + (y - x) / 2) / 100;
  }

  quote(pair) {
    return pair.substr(pair.length - 3);
  }

  getPrices() {
    // We use _this to scope, instead of bind
    const _this = this;

    // Assign promise to a variable for chaining
    let x = new Promise(function(resolve, reject) {
      const request = new XMLHttpRequest();

      // For some reason there is CORS policy error
      // when we use remote endpoint https://pastebin.com/raw/KCJm3Kzb
      request.open("GET", "data.json", true);

      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          const prices = JSON.parse(request.responseText).data.prices;

          // Map array function to add mid() and quote()
          // to the items of the array
          const newPrices = prices.map(function(item) {
            item.mid = function() {
              return _this.mid(item.buy, item.sell);
            };

            item.quote = function() {
              return _this.quote(item.pair);
            };
            return item;
          });

          resolve(newPrices);
        } else {
          reject(new TypeError("Cannot load remote endpoint"));
        }
      };
      request.send();
    });

    return x;
  }
}
