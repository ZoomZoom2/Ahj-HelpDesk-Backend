### HelpDesk

#### Легенда

Backend-разработчик вернулся из отпуска, поэтому писать прототип API для сервиса управления заявками уже не нужно, оно готово.

#### Описание

Описание API. Для хранения данных мы будем оперировать следующими структурами:
```javascript
Ticket {
    id // идентификатор (уникальный в пределах системы)
    name // краткое описание
    status // boolean - сделано или нет
    description // полное описание
    created // дата создания (timestamp)
}
```

Примеры запросов:
* `GET    ?method=allTickets`           - список тикетов
* `GET    ?method=ticketById&id=<id>` - полное описание тикета (где `<id>` - идентификатор тикета)
* `POST   ?method=createTicket`         - создание тикета (`<id>` генерируется на сервере, в теле формы `name`, `description`, `status`)

Соответственно:
* `POST   ?method=createTicket`         - в теле запроса форма с полями для объекта типа `Ticket` (с `id` = `null`)
* `POST   ?method=updateById&id=<id>` - в теле запроса форма с полями для обновления объекта типа `Ticket` по `id`
* `GET    ?method=allTickets `          - массив объектов типа `Ticket` (т.е. без `description`)
* `GET    ?method=ticketById&id=<id>` - объект типа `Ticket`
* `GET    ?method=deleteById&id=<id>` - удалить объект типа `Ticket` по `id`, при успешном запросе статус ответа 204

Код ниже позволит обработать полученный ответ от сервера во Frontend:
```js
xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        try {
            const data = JSON.parse(xhr.responseText);
        } catch (e) {
            console.error(e);
        }
    }
});
```

---