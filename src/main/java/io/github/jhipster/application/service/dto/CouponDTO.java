package io.github.jhipster.application.service.dto;

import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Coupon entity.
 */
public class CouponDTO implements Serializable {

    private Long id;

    @NotNull
    private String title;

    @NotNull
    private Long start;

    @NotNull
    private Long end;

    @NotNull
    private Long amount;

    @NotNull
    private String couponType;

    @NotNull
    private String message;

    @NotNull
    private Double price;

    @NotNull
    private String image;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Long getStart() {
        return start;
    }

    public void setStart(Long start) {
        this.start = start;
    }

    public Long getEnd() {
        return end;
    }

    public void setEnd(Long end) {
        this.end = end;
    }

    public Long getAmount() {
        return amount;
    }

    public void setAmount(Long amount) {
        this.amount = amount;
    }

    public String getCouponType() {
        return couponType;
    }

    public void setCouponType(String couponType) {
        this.couponType = couponType;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CouponDTO couponDTO = (CouponDTO) o;
        if (couponDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), couponDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CouponDTO{" +
            "id=" + getId() +
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
