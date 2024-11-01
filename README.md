# 3 курс
# Крупина Полина Андреевна
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Архитектура проекта
Архитектура приложения базируется на паттерне MVP:

Model: Управляет бизнес-логикой и состоянием данных, такими как товары, корзина и заказы.
View: Отвечает за отображение данных и взаимодействие с пользователем.
Presenter: Обрабатывает логику взаимодействия между Model и View, контролируя действия пользователя и обновления данных.

## Описание базовых классов и компонентов
Model
- ProductModel: Обеспечивает получение данных о товарах из API и их предоставление для отображения.
- CartModel: Управляет данными корзины (добавление, удаление и получение товаров).
- OrderModel: Управляет процессом оформления заказа, включая данные о способе оплаты и контактных данных.
- UserModel: Хранит информацию о текущем пользователе, включая контактные данные и адрес доставки.

View
- ProductListView: Отображает список товаров.
- ProductDetailView: Показывает детальную информацию о выбранном товаре.
- CartView: Отображает содержимое корзины и позволяет управлять товарами в корзине.
- OrderFormView: Показывает форму оформления заказа и валидацию данных.

Presenter
- ProductPresenter: Загружает данные о товарах и управляет отображением деталей товара.
- CartPresenter: Отвечает за добавление и удаление товаров из корзины, а также обновление её состояния.
- OrderPresenter: Управляет процессом оформления заказа, валидацией данных и взаимодействием с сервером.

EventEmitter
Компонент EventEmitter реализует интерфейс IEvents, позволяя управлять событиями через стандартные методы on, off, emit и trigger. Он обеспечивает взаимодействие между компонентами, поддерживая подписку на события.

## Описание типов данных
Основные типы данных описаны в файле src/types.ts:

Product — тип данных для представления товара:
- id: number — уникальный идентификатор товара;
- name: string — название товара, отображаемое пользователю;
- description: string — описание товара, раскрывающее его особенности и характеристики;
- price: number — стоимость товара;
- imageUrl: string — URL-адрес изображения товара;
- isAvailable: boolean — флаг, указывающий на доступность товара.

CartItem — тип данных для представления элемента корзины:
- productId: number — уникальный идентификатор товара в корзине;
- quantity: number — количество единиц товара, добавленных в корзину.

Order: тип данных для представления информации о заказе:
- id: number — уникальный идентификатор заказа;
- paymentMethod: PaymentMethod — способ оплаты заказа;
- deliveryAddress: string — адрес доставки заказа;
- customerEmail: string — электронная почта покупателя для связи и подтверждений;
- customerPhone: string — номер телефона покупателя;
- items: CartItem[] — массив товаров в заказе, где каждый элемент — объект типа CartItem, содержащий идентификатор и количество товара.

PaymentMethod: тип данных для обозначения способа оплаты:
- 'creditCard': string — оплата кредитной картой;
- 'paypal': string — оплата через PayPal;
- 'bankTransfer': string — оплата банковским переводом.

ApiResponse<T>: обобщённый тип данных для описания ответа API:
- success: boolean — флаг, указывающий на успешность запроса;
- data: T — данные, возвращаемые сервером, тип определяется при использовании;
- message?: string — сообщение о результате запроса.

AppState: тип данных для описания состояния приложения:
- products: Product[] — массив всех доступных товаров;
- cart: CartItem[] — массив товаров, добавленных в корзину;
- order: Partial<Order> — частичный объект заказа, содержащий текущие данные, введённые пользователем;
- isLoading: boolean — флаг загрузки;
- error?: string — сообщение об ошибке, если операция завершилась неудачей.

User: тип данных для представления информации о пользователе:
- id: number — уникальный идентификатор пользователя.
- name: string — имя пользователя.
- email: string — электронная почта пользователя.
- phone: string — номер телефона пользователя.
- addresses: string[] — массив строк, представляющий список адресов доставки пользователя.

## Взаимодействие компонентов
1. Пользователь выбирает товар на странице каталога.
2. ProductPresenter загружает информацию о товаре с помощью ProductModel и отображает её через ProductDetailView.
3. При добавлении товара в корзину CartPresenter вызывает CartModel для обновления корзины и обновляет CartView.
4. OrderPresenter управляет процессом оформления заказа, включая валидацию данных и отправку заказа с помощью OrderModel.
5. После успешной оплаты заказ и корзина очищаются, а пользователь получает уведомление.