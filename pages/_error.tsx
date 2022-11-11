import { NextPageContext } from "next";
import NextErrorComponent from "next/error";

import * as Sentry from "@sentry/nextjs";

interface Props {
  statusCode: number;
}

const CustomErrorComponent = (props: Props) => (
  <NextErrorComponent statusCode={props.statusCode} />
);

CustomErrorComponent.getInitialProps = async (contextData: NextPageContext) => {
  await Sentry.captureUnderscoreErrorException(contextData);
  return NextErrorComponent.getInitialProps(contextData);
};

export default CustomErrorComponent;
