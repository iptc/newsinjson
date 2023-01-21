package org.iptc.ninjs.contact2;

public class ContactInfo {
  private String type;
  private String role;
  private String lang;
  private String name;
  private String value;
  private Address address;

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

  public Address getAddress() {
    return address;
  }

  public void setAddress(Address address) {
    this.address = address;
  }


  public static class Builder {
    private String type;
    private String role;
    private String lang;
    private String name;
    private String value;
    private Address address;

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
    public Builder withAddress(Address address) {
      this.address = address;
      return this;
    }

    public ContactInfo build() {
      return new ContactInfo(this);
    }
  }
}
