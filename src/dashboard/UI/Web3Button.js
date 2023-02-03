import React from 'react'
import { useWeb3Context } from '../../context'
import classes from "./Web3Button.module.css";

const ConnectButton = ({ connect }) => {
  return connect ? (
    <button id={classes['connect']} onClick={connect}>Connect</button>
  ) : (
    <button id={classes['connect']}>Loading...</button>
  )
}

const DisconnectButton = ({ disconnect }) => {
  return disconnect ? (
    <button id={classes['connect']} onClick={disconnect}>Disconnect</button>
  ) : (
    <button id={classes['connect']}>Loading...</button>
  )
}

export function Web3Button() {
  const { web3Provider, connect, disconnect } = useWeb3Context()

  return web3Provider ? (
    <DisconnectButton disconnect={disconnect} />
  ) : (
    <ConnectButton connect={connect} />
  )
}