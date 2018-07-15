package io.github.jhipster.application.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A Coupon.
 */
@Entity
@Table(name = "coupon")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Coupon implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "company", nullable = false)
    private Long company;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @NotNull
    @Column(name = "jhi_start", nullable = false)
    private Long start;

    @NotNull
    @Column(name = "jhi_end", nullable = false)
    private Long end;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Long amount;

    @NotNull
    @Column(name = "coupon_type", nullable = false)
    private String couponType;

    @NotNull
    @Column(name = "message", nullable = false)
    private String message;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @NotNull
    @Column(name = "image", nullable = false)
    private String image;

    @OneToOne
    @JoinColumn(unique = true)
    private Company company;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompany() {
        return company;
    }

    public Coupon company(Long company) {
        this.company = company;
        return this;
    }

    public void setCompany(Long company) {
        this.company = company;
    }

    public String getTitle() {
        return title;
    }

    public Coupon title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getStart() {
        return start;
    }

    public Coupon start(Long start) {
        this.start = start;
        return this;
    }

    public void setStart(Long start) {
        this.start = start;
    }

    public Long getEnd() {
        return end;
    }

    public Coupon end(Long end) {
        this.end = end;
        return this;
    }

    public void setEnd(Long end) {
        this.end = end;
    }

    public Long getAmount() {
        return amount;
    }

    public Coupon amount(Long amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getCouponType() {
        return couponType;
    }

    public Coupon couponType(String couponType) {
        this.couponType = couponType;
        return this;
    }

    public void setCouponType(String couponType) {
        this.couponType = couponType;
    }

    public String getMessage() {
        return message;
    }

    public Coupon message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Double getPrice() {
        return price;
    }

    public Coupon price(Double price) {
        this.price = price;
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public Coupon image(String image) {
        this.image = image;
        return this;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Company getCompany() {
        return company;
    }

    public Coupon company(Company company) {
        this.company = company;
        return this;
    }

    public void setCompany(Company company) {
        this.company = company;
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
        Coupon coupon = (Coupon) o;
        if (coupon.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), coupon.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Coupon{" +
            "id=" + getId() +
            ", company=" + getCompany() +
            ", title='" + getTitle() + "'" +
            ", start=" + getStart() +
            ", end=" + getEnd() +
            ", amount=" + getAmount() +
            ", couponType='" + getCouponType() + "'" +
            ", message='" + getMessage() + "'" +
            ", price=" + getPrice() +
            ", image='" + getImage() + "'" +
            "}";
    }
}
