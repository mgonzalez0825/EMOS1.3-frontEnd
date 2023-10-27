import { useLocalState } from "../../util/useLocalStorage";

const SignOutComponent = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  setJwt(null);

  console.log("jwt set to null");
  window.location.href = "/login";

}

export default SignOutComponent;