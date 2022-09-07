import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [amount, setAmount] = useState('');

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  }

  const paymentStart = () => {
    console.log("payment started");
    console.log(amount);

    if (amount == '' || amount == null) {
      toast.error("amount is empty");
      return;
    }

    // send request to server
    fetch('http://localhost:8080/user/create_order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({amount : amount , info : 'order_request'}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);

        if(data.status == "created"){

          // open payment form
          let options = {
            key : 'rzp_test_9p5Kn6VbUy2uaH',
            amount : data.amount,
            currency : 'INR',
            name : 'Payment Trial using Razorpay',
            description : 'donation',
            image : 'https://cdn.maikoapp.com/3d4b/4qy9k/180w.jpg',
            order_id : data.id ,
            handler: function(data){
              console.log(data.razorpay_payment_id)
              console.log(data.razorpay_order_id)
              console.log(data.razorpay_signature)
              console.log("payment successful");
              toast.success("payment successful");
            },
            prefill : {
              name : "",
              email : "",
              contact : ""
            },
            notes : {
              address : "Learncode with Durgesh"
            },
            theme : {
              color : "#3399cc"
            }
          };

          let rzp = new window.Razorpay(options);

          rzp.on('payment.failed', function (response){
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
            toast.error("Oops payment failed");
            });


          rzp.open();
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    //toast.success("payment done");
  }
  return (
    <div className='container text-center mt-4'>
      <ToastContainer position='bottom-center' />
      <h3>Donate Us</h3>
      <input type="text" className='form-control mt-3' placeholder='Enter amount here' onChange={handleAmountChange} />
      <div className="container text-center">
        <button className="btn btn-success mt-2" onClick={paymentStart}>
          PAY
        </button>
      </div>
    </div>
  );
}

export default App;
