package io.github.jhipster.application.service.mapper;

import io.github.jhipster.application.domain.*;
import io.github.jhipster.application.service.dto.CouponDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Coupon and its DTO CouponDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CouponMapper extends EntityMapper<CouponDTO, Coupon> {



    default Coupon fromId(Long id) {
        if (id == null) {
            return null;
        }
        Coupon coupon = new Coupon();
        coupon.setId(id);
        return coupon;
    }
}
