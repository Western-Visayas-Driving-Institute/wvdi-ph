import { useEffect } from "react";

function MessengerChat() {
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        xfbml: true,
        version: "v19.0",
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "facebook-jssdk");
  }, []);

  return (
    <div
      className="fb-customerchat"
      attribution="setup_tool"
      page_id="118846314796074"
      theme_color="#0D47A1"
      logged_in_greeting="Hi! How can we help you at WVDI?"
      logged_out_greeting="Hi! How can we help you at WVDI?"
    ></div>
  );
}

export default MessengerChat;
