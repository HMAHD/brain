
APi (backend) nginx full config with security

```bash
server {
    listen 80;
    server_name api.mybuz.online;

    location / {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Timeout Settings
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffer Settings (if necessary)
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}

# Redirect HTTP to HTTPS (if using SSL)
server {
    listen 80;
    server_name api.mybuz.online;
    return 301 https://$host$request_uri;
}

```


## /scrape/glomark/initial - ❗not working
```
{ "detail": [ { "type": "json_invalid", "loc": [ "body", 83 ], "msg": "JSON decode error", "input": {}, "ctx": { "error": "Expecting ',' delimiter" } } ] }
```

- Response header
$$
 access-control-allow-credentials: true  access-control-allow-origin: *  alt-svc: h3=":443"; ma=86400  cf-cache-status: DYNAMIC  cf-ray: 91b83eb6ff303c83-CDG  content-length: 133  content-type: application/json  date: Wed,05 Mar 2025 08:29:19 GMT  nel: {"success_fraction":0,"report_to":"cf-nel","max_age":604800}  report-to: {"endpoints":[{"url":"https:\/\/a.nel.cloudflare.com\/report\/v4?s=pArVFcvDDDdeVCwfAXl6Sq%2FaNiiBS30hWPjwpqerqcICFq3uyI%2BINBMyQSvnSS3VPpmokJLx%2B1VpnltS3Xb0H%2Fx%2BLFUf6AmxpbSj%2BdpMb6etk%2B%2BfNEuQwVtcaMwDaA1VBS18nk3hPWIS6zPIz7efnFd6"}],"group":"cf-nel","max_age":604800} server: cloudflare
$$

## /scrape/lassana/initial - ❗wrong price
```
{ "status": "Product scraping and saving completed", "product": { "_id": "67c80c28223d53c4977f9223", "product_id": "SUPMKTLCOM118", "product_url": "https://lassana.com/product/AMBUL%20BANANA%201KG/SUPMKTLCOM118", "product_name": "AMBUL BANANA 1KG", "product_price": 0.68 } }
```

## /scrape/spar2U/initial - ✅
```js
{ "status": "Product scraping and saving completed", "product": { "_id": "67c810a8223d53c4977f9c55", "product_id": "pepsi-1-5l", "product_url": "https://spar2u.lk/products/pepsi-1-5l", "product_name": "PEPSI, 1.5l", "product_price": 299 } }
```


## /scrape/cargills/initial - ✅
```js
{ "status": "Product scraping and saving completed", "product": { "product_url": "https://cargillsonline.com/ProductDetails/Household/Vim-Liquid-Dishwash?ID=gUKrfNLFYDKjP/X8tVDtrQ==", "product_name": "Vim Liquid Dishwash - 500.00 ml", "product_id": "gUKrfNLFYDKjP/X8tVDtrQ==", "product_type": "Dishwash Liquid", "product_price": 297.5 } }
```


## /scrape/keells/initial - ❗price is not after offer
``` js
{ "status": "Product scraping and saving completed", "product": { "_id": "67c8120f223d53c4977f9f4c", "product_id": "118832", "product_url": "https://www.keellssuper.com/productDetail?itemcode=118832&Keells_Cheese_Snacks_50g", "product_name": "Keells Cheese Snacks 50g", "product_price": 179 } }
```

should get - `product-card-final-price`  