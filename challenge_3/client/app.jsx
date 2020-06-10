//===========================Child components===========================
const Input = (props) => {
  return (
    <div>
      <label>{`${props.label}:`}
        <input type="text" name={props.name}></input>
      </label>
    </div>
  );
};

const Button = (props) => {
  return <button id={props.id}>{props.message}</button>
};

//===========================Page components============================
const HomePage = (props) => {
  let message;
  if (props.returnedHome) {
    message = 'Thank you for your purchase! Please select "Checkout" below to begin a new checkout process:'
  } else {
    message = 'Please select "Checkout" below to begin the checkout process:'
  }
  return (
    <div>
      <p>{message}</p>
      <Button message="Checkout" id="checkout" />
    </div>
  );
};

const F1 = () => {
  return (
    <div>
      <p>Please create an account:</p>
      <Input label="Name" name="name" />
      <Input label="Email" name="email" />
      <Input label="Password" name="password" />
      <Button message="Next" id="next" />
    </div>
  );
};

const F2 = () => {
  return (
    <div>
      <p>Please enter your shipping information:</p>
      <Input label="Address Line 1" name="address-1" />
      <Input label="Address Line 2" name="address-2" />
      <Input label="City" name="city" />
      <Input label="State" name="state" />
      <Input label="Zip Code" name="zip" />
      <Button message="Next" id="next" />
    </div>
  );
};

const F3 = () => {
  return (
    <div>
      <p>Please enter your payment information:</p>
      <Input label="Credit Card Number" name="credit-card-num" />
      <Input label="Expiration Date" name="exp-date" />
      <Input label="CVV" name="cvv" />
      <Input label="Billing Zip Code" name="billing-zip" />
      <Button message="Next" id="next" />
    </div>
  );
};

const ConfirmationPage = () => {
  return (
    <div>
      <p>Please confirm your information and then complete your purchase:</p>
      <Button message="Purchase" id="purchase" />
    </div>
  );
};

//===========================Rendering==================================
const renderPages = (returnedHome) => {

  ReactDOM.render(<HomePage returnedHome={returnedHome}/>, document.getElementById('app'));

  const checkoutButton = document.getElementById('checkout');

  checkoutButton.addEventListener('click', () => {
    ReactDOM.render(<F1 />, document.getElementById('app'));
    let nextButton = document.getElementById('next');

    nextButton.addEventListener('click', () => {
      ReactDOM.render(<F2 />, document.getElementById('app'));
      nextButton = document.getElementById('next');

      nextButton.addEventListener('click', () => {
        ReactDOM.render(<F3 />, document.getElementById('app'));
        nextButton = document.getElementById('next');

        nextButton.addEventListener('click', () => {
          ReactDOM.render(<ConfirmationPage />, document.getElementById('app'));
          const purchaseButton = document.getElementById('purchase');

          purchaseButton.addEventListener('click', () => {
            renderPages(true);
          });
        });
      });
    });
  });

};

//===========================Initialize=================================
renderPages();

//===========================HTTP requests==============================
const createNewUser = () => {
  axios.post('/users')
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const updateUserAccountInfo = (name, email, pw) => {

};

const updateUserShipping = (line1, line2, city, state, zip) => {

};

const updateUserPayment = (ccn, exp, cvv, zip) => {

};

const getUserInfo = (name) => {

};
