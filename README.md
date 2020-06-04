# Szczęśliwy numerek

Jeden prosty sposób na pobranie szczęśliwego numerka. Codziennie o 6:45 pobieramy numerek z dziennika  i udostępniamy go wszystkim zainteresowanym w formie API jsonowego.

## Sposób użycia

```sh
curl https://zsk-poznan.github.io/szczesliwy-numerek-backend
```

Lub dosłownie inny klient http...

W odpowiedzi dostaniesz JSON-a w takiej postaci:

```json
{"LO":1,"TK":2}
```

`LO` - numerek dla liceum

`TK` - numerek dla technikum



## Development

Za pomocą `npm start` możesz uruchomić scaper



