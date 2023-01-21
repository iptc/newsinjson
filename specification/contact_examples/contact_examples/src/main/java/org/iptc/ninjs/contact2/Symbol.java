package org.iptc.ninjs.contact2;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"exchange", "ticker"})
public class Symbol {
  private String ticker;
  private String exchange;

  private Symbol(){}

  private Symbol(Builder builder) {
    this.setTicker(builder.ticker);
    this.setExchange(builder.exchange);
  }

  public static Builder getBuilder() {
    return new Builder();
  }

  public String getTicker() {
    return ticker;
  }

  public void setTicker(String ticker) {
    this.ticker = ticker;
  }

  public String getExchange() {
    return exchange;
  }

  public void setExchange(String exchange) {
    this.exchange = exchange;
  }


  public static class Builder {
    private String ticker;
    private String exchange;

    public Builder withTicker(String ticker) {
      this.ticker = ticker;
      return this;
    }
    public Builder withExchange(String exchange) {
      this.exchange = exchange;
      return this;
    }
    public Symbol build() {
      return new Symbol(this);
    }
  }
}
