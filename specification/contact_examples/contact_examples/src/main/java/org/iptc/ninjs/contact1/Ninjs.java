package org.iptc.ninjs.contact1;

import java.util.ArrayList;
import java.util.List;

public class Ninjs {

  private String uri;
  private List<Organisation> organisations;
  private List<People> people;

  public Ninjs(Builder builder) {
    this.uri = builder.uri;
    this.organisations = builder.organisations;
    this.people = builder.people;
  }

  public static Builder getBuilder() {
    return new Builder();
  }

  public String getUri() {
    return uri;
  }

  public void setUri(String uri) {
    this.uri = uri;
  }

  public List<Organisation> getOrganisations() {
    return organisations;
  }

  public void setOrganisations(List<Organisation> organisations) {
    this.organisations = organisations;
  }

  public List<People> getPeople() {
    return people;
  }

  public void setPeople(List<People> people) {
    this.people = people;
  }

  public static class Builder {
    private String uri;
    private List<Organisation> organisations = new ArrayList<>();
    private List<People> people = new ArrayList<>();

    public Builder withUri(String uri) {
      this.uri = uri;
      return this;
    }

    public Builder withOrganisation(Organisation organisation) {
      this.organisations.add(organisation);
      return this;
    }

    public Builder withPeople(People people) {
      this.people.add(people);
      return this;
    }

    public Ninjs build() {
      return new Ninjs(this);
    }
  }
}
