package org.iptc.ninjs.contact2;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import java.util.ArrayList;
import java.util.List;

@JsonPropertyOrder({"lines", "locality", "area", "postalcode", "country"})
public class Address {

  @JsonProperty("lines")
  private List<String> lines;
  private String locality;
  private String area;
  @JsonProperty("postalcode")
  private String postalCode;
  private String country;

  public Address(Builder builder) {
    this.lines = builder.lines;
    this.locality = builder.locality;
    this.area = builder.area;
    this.postalCode = builder.postalCode;
    this.country = builder.country;
  }

  public static Builder getBuilder() {
    return new Builder();
  }

  public List<String> getLine() {
    return lines;
  }

  public void setLine(List<String> lines) {
    this.lines = lines;
  }

  public String getLocality() {
    return locality;
  }

  public void setLocality(String locality) {
    this.locality = locality;
  }

  public String getArea() {
    return area;
  }

  public void setArea(String area) {
    this.area = area;
  }

  public String getPostalCode() {
    return postalCode;
  }

  public void setPostalCode(String postalCode) {
    this.postalCode = postalCode;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public static class Builder {
    private List<String> lines = new ArrayList<>();
    private String locality;
    private String area;
    @JsonProperty("postalcode")
    private String postalCode;
    private String country;

    public Builder withLine(String line) {
      this.lines.add(line);
      return this;
    }

    public Builder withLocality(String locality) {
      this.locality = locality;
      return this;
    }

    public Builder withArea(String area) {
      this.area = area;
      return this;
    }

    public Builder withPostalCode(String postalCode) {
      this.postalCode = postalCode;
      return this;
    }

    public Builder withCountry(String country) {
      this.country = country;
      return this;
    }

    public Address build() {
      return new Address(this);
    }
  }
}
