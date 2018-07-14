package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Customer.
 */
@Entity
@Table(name = "customer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "customer_name", nullable = false)
    private String customerName;

    @OneToOne
    @JoinColumn(unique = true)
    private User customer;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "customer_customer",
               joinColumns = @JoinColumn(name = "customers_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "customers_id", referencedColumnName = "id"))
    private Set<Coupon> customers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCustomerName() {
        return customerName;
    }

    public Customer customerName(String customerName) {
        this.customerName = customerName;
        return this;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public User getCustomer() {
        return customer;
    }

    public Customer customer(User user) {
        this.customer = user;
        return this;
    }

    public void setCustomer(User user) {
        this.customer = user;
    }

    public Set<Coupon> getCustomers() {
        return customers;
    }

    public Customer customers(Set<Coupon> coupons) {
        this.customers = coupons;
        return this;
    }

    public Customer addCustomer(Coupon coupon) {
        this.customers.add(coupon);
        return this;
    }

    public Customer removeCustomer(Coupon coupon) {
        this.customers.remove(coupon);
        return this;
    }

    public void setCustomers(Set<Coupon> coupons) {
        this.customers = coupons;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Customer customer = (Customer) o;
        if (customer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Customer{" +
            "id=" + getId() +
            ", customerName='" + getCustomerName() + "'" +
            "}";
    }
}
