const CheckoutPage = () => {
  return (
    <div>
      <button id="checkout">Checkout</button>
    </div>
  );
}

const F1 = () => {
  return (
    <div>
      <button id="next">Next1</button>
    </div>
  );
}

const F2 = () => {
  return (
    <div>
      <button id="next">Next2</button>
    </div>
  );
}

const F3 = () => {
  return (
    <div>
      <button id="next">Next3</button>
    </div>
  );
}

ReactDOM.render(<CheckoutPage />, document.getElementById('app'));

const checkoutButton = document.getElementById('checkout');

checkoutButton.addEventListener('click', () => {
  ReactDOM.render(<F1 />, document.getElementById('app'));
  let nextButton = document.getElementById('next');

  nextButton.addEventListener('click', () => {
    ReactDOM.render(<F2 />, document.getElementById('app'));
    nextButton = document.getElementById('next');

    nextButton.addEventListener('click', () => {
      ReactDOM.render(<F3 />, document.getElementById('app'));
    });
  });
});