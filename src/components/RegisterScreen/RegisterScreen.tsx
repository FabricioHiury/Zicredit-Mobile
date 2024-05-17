import React from 'react';
import RegisterForm from './RegisterForm';

const RegisterCompanyScreen = () => {
  return <RegisterForm type="company" />;
};

const RegisterProjectScreen = () => {
  return <RegisterForm type="project" />;
};

const RegisterSellerScreen = () => {
  return <RegisterForm type="seller" />;
};

const RegisterInvestorScreen = () => {
  return <RegisterForm type="investor" />;
};

export {
  RegisterCompanyScreen,
  RegisterProjectScreen,
  RegisterSellerScreen,
  RegisterInvestorScreen,
};
