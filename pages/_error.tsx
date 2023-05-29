import { NextPageContext } from "next";
import NextErrorComponent from "next/error";

interface Props {
  statusCode: number;
}

const CustomErrorComponent = (props: Props) => (
  <NextErrorComponent statusCode={props.statusCode} />
);

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
