import React from 'react';
import { Box, Text, Form, FormField, Button } from 'grommet';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { initialize, updateRates } from '../store';
import { store } from '../index';
import { initWeb3 } from '../util/web3';
import { initDfuse } from '../util/dfuse';

const startRateUpdates = () => {
  setInterval(() => {
    store.dispatch(updateRates());
  }, 500);
};

const ConnexionForm = ({ initialize }) => {
  const onSubmit = ({ value }) => {
    const { ethPrivateKey, infuraKey, dfuseKey } = value;
    initialize(ethPrivateKey, infuraKey, dfuseKey);
    initWeb3(infuraKey, ethPrivateKey);
    initDfuse(dfuseKey);
    startRateUpdates();
  };

  return (
    <Box fill gap="small">
      <Box fill={true} elevation={'medium'} pad={'small'} background={'accent-1'}>
        <Text textAlign={'center'} size={'large'}>
          Flash Arbitrage Watcher
        </Text>
      </Box>
      <Box fill elevation={'small'} pad={'xsmall'}>
        <Form onSubmit={onSubmit}>
          <FormField label="Ropsten private key" name="ethPrivateKey" type="password" required />
          <FormField label="Infura API key" name="infuraKey" type="password" required />
          <FormField label="Dfuse API key" name="dfuseKey" type="password" required />
          <Box direction="row" justify={'center'} margin={{ top: 'medium' }}>
            <Button type="submit" label="Start the demo" primary />
          </Box>
        </Form>
      </Box>
    </Box>
  );
};

ConnexionForm.propTypes = {
  initialize: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  initialize: (ethPrivateKey, infuraKey, dfuseKey) => {
    dispatch(initialize(ethPrivateKey, infuraKey, dfuseKey));
  },
});

export default connect(null, mapDispatchToProps)(ConnexionForm);
