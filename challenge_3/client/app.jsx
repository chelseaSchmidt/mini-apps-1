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
const renderHome = (returnedHome) => {

  ReactDOM.render(<HomePage returnedHome={returnedHome}/>, document.getElementById('app'));

  const checkoutButton = document.getElementById('checkout');

  checkoutButton.addEventListener('click', () => {
    createNewUser((err, res) => {
      if (err) {
        console.log(err);
      } else {
        const userId = res.data.insertId;
        updateUserAccountInfo(userId);
        renderF1();
      }
    });

  });

};

const renderF1 = () => {
  ReactDOM.render(<F1 />, document.getElementById('app'));
  const nextButton = document.getElementById('next');
  nextButton.addEventListener('click', renderF2);
};

const renderF2 = () => {
  ReactDOM.render(<F2 />, document.getElementById('app'));
  const nextButton = document.getElementById('next');
  nextButton.addEventListener('click', renderF3);
};

const renderF3 = () => {
  ReactDOM.render(<F3 />, document.getElementById('app'));
  const nextButton = document.getElementById('next');
  nextButton.addEventListener('click', renderConfirm);
};

const renderConfirm = () => {
  ReactDOM.render(<ConfirmationPage />, document.getElementById('app'));
  const purchaseButton = document.getElementById('purchase');
  purchaseButton.addEventListener('click', () => {
    renderHome(true);
  });
};

//===========================Initialize=================================
renderHome();

//===========================HTTP requests==============================
function createNewUser(callback) {
  axios.post('/users')
    .then(res => {
      callback(null, res);
    })
    .catch(err => {
      callback(err);
    });
};

function updateUserAccountInfo(id, name, email, pw) {

};

function updateUserShipping(id, line1, line2, city, state, zip) {

};

function updateUserPayment(id, ccn, exp, cvv, zip) {

};

function getUserInfo(id) {

};
