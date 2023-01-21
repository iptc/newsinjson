package org.iptc.ninjs.contact1;

import java.util.ArrayList;
import java.util.List;

public class ContactInfo {
  private String type;
  private String role;
  private String lang;
  private String name;
  private String value;
  private List<Address> address;

  private ContactInfo(){}
  public ContactInfo(Builder builder) {
    this.type = builder.type;
    this.role = builder.role;
    this.lang = builder.lang;
    this.name = builder.name;
    this.value = builder.value;
    this.address = builder.address;
  }

  public static Builder getBuilder() {
    return new Builder();
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  public String getRole() {
    return role;
  }

  public void setRole(String role) {
    this.role = role;
  }

  public String getLang() {
    return lang;
  }

  public void setLang(String lang) {
    this.lang = lang;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getValue() {
    return value;
  }

  public void setValue(String value) {
    this.value = value;
  }

  public List<Address> getAddress() {
    return address;
  }

  public void setAddress(List<Address> address) {
    this.address = address;
  }


  public static class Builder {
    private String type;
    private String role;
    private String lang;
    private String name;
    private String value;
    private List<Address> address = new ArrayList<>();

    public Builder withType(String type) {
      this.type = type;
      return this;
    }
    public Builder withRole(String role) {
      this.role = role;
      return this;
    }
    public Builder withLang(String lang) {
      this.lang = lang;
      return this;
    }

    public Builder withName(String name) {
      this.name = name;
      return this;
    }

    public Builder withValue(String value) {
      this.value = value;
      return this;
    }
    public Builder withAddress(String part, String value) {
      this.address.add(new Address(part, value));
      return this;
    }

    public ContactInfo build() {
      return new ContactInfo(this);
    }
  }
  public static class Address {
    private String part;
    private String value;
    public Address(String part, String value) {
      this.part = part;
      this.value = value;
    }

    public String getPart() {
      return part;
    }

    public void setPart(String part) {
      this.part = part;
    }

    public String getValue() {
      return value;
    }

    public void setValue(String value) {
      this.value = value;
    }
  }


}
