package io.github.jhipster.application.web.rest;

import io.github.jhipster.application.JhipsterSampleApplicationApp;

import io.github.jhipster.application.domain.Coupon;
import io.github.jhipster.application.repository.CouponRepository;
import io.github.jhipster.application.service.CouponService;
import io.github.jhipster.application.service.dto.CouponDTO;
import io.github.jhipster.application.service.mapper.CouponMapper;
import io.github.jhipster.application.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static io.github.jhipster.application.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CouponResource REST controller.
 *
 * @see CouponResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class CouponResourceIntTest {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final Long DEFAULT_START = 1L;
    private static final Long UPDATED_START = 2L;

    private static final Long DEFAULT_END = 1L;
    private static final Long UPDATED_END = 2L;

    private static final Long DEFAULT_AMOUNT = 1L;
    private static final Long UPDATED_AMOUNT = 2L;

    private static final String DEFAULT_COUPON_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_COUPON_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final Double DEFAULT_PRICE = 1D;
    private static final Double UPDATED_PRICE = 2D;

    private static final String DEFAULT_IMAGE = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE = "BBBBBBBBBB";

    @Autowired
    private CouponRepository couponRepository;


    @Autowired
    private CouponMapper couponMapper;
    

    @Autowired
    private CouponService couponService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restCouponMockMvc;

    private Coupon coupon;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CouponResource couponResource = new CouponResource(couponService);
        this.restCouponMockMvc = MockMvcBuilders.standaloneSetup(couponResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Coupon createEntity(EntityManager em) {
        Coupon coupon = new Coupon()
            .title(DEFAULT_TITLE)
            .start(DEFAULT_START)
            .end(DEFAULT_END)
            .amount(DEFAULT_AMOUNT)
            .couponType(DEFAULT_COUPON_TYPE)
            .message(DEFAULT_MESSAGE)
            .price(DEFAULT_PRICE)
            .image(DEFAULT_IMAGE);
        return coupon;
    }

    @Before
    public void initTest() {
        coupon = createEntity(em);
    }

    @Test
    @Transactional
    public void createCoupon() throws Exception {
        int databaseSizeBeforeCreate = couponRepository.findAll().size();

        // Create the Coupon
        CouponDTO couponDTO = couponMapper.toDto(coupon);
        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isCreated());

        // Validate the Coupon in the database
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeCreate + 1);
        Coupon testCoupon = couponList.get(couponList.size() - 1);
        assertThat(testCoupon.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testCoupon.getStart()).isEqualTo(DEFAULT_START);
        assertThat(testCoupon.getEnd()).isEqualTo(DEFAULT_END);
        assertThat(testCoupon.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testCoupon.getCouponType()).isEqualTo(DEFAULT_COUPON_TYPE);
        assertThat(testCoupon.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testCoupon.getPrice()).isEqualTo(DEFAULT_PRICE);
        assertThat(testCoupon.getImage()).isEqualTo(DEFAULT_IMAGE);
    }

    @Test
    @Transactional
    public void createCouponWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = couponRepository.findAll().size();

        // Create the Coupon with an existing ID
        coupon.setId(1L);
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Coupon in the database
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = couponRepository.findAll().size();
        // set the field null
        coupon.setTitle(null);

        // Create the Coupon, which fails.
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStartIsRequired() throws Exception {
        int databaseSizeBeforeTest = couponRepository.findAll().size();
        // set the field null
        coupon.setStart(null);

        // Create the Coupon, which fails.
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkEndIsRequired() throws Exception {
        int databaseSizeBeforeTest = couponRepository.findAll().size();
        // set the field null
        coupon.setEnd(null);

        // Create the Coupon, which fails.
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = couponRepository.findAll().size();
        // set the field null
        coupon.setAmount(null);

        // Create the Coupon, which fails.
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkCouponTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = couponRepository.findAll().size();
        // set the field null
        coupon.setCouponType(null);

        // Create the Coupon, which fails.
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkMessageIsRequired() throws Exception {
        int databaseSizeBeforeTest = couponRepository.findAll().size();
        // set the field null
        coupon.setMessage(null);

        // Create the Coupon, which fails.
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPriceIsRequired() throws Exception {
        int databaseSizeBeforeTest = couponRepository.findAll().size();
        // set the field null
        coupon.setPrice(null);

        // Create the Coupon, which fails.
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkImageIsRequired() throws Exception {
        int databaseSizeBeforeTest = couponRepository.findAll().size();
        // set the field null
        coupon.setImage(null);

        // Create the Coupon, which fails.
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        restCouponMockMvc.perform(post("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCoupons() throws Exception {
        // Initialize the database
        couponRepository.saveAndFlush(coupon);

        // Get all the couponList
        restCouponMockMvc.perform(get("/api/coupons?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(coupon.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].start").value(hasItem(DEFAULT_START.intValue())))
            .andExpect(jsonPath("$.[*].end").value(hasItem(DEFAULT_END.intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.intValue())))
            .andExpect(jsonPath("$.[*].couponType").value(hasItem(DEFAULT_COUPON_TYPE.toString())))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].price").value(hasItem(DEFAULT_PRICE.doubleValue())))
            .andExpect(jsonPath("$.[*].image").value(hasItem(DEFAULT_IMAGE.toString())));
    }
    

    @Test
    @Transactional
    public void getCoupon() throws Exception {
        // Initialize the database
        couponRepository.saveAndFlush(coupon);

        // Get the coupon
        restCouponMockMvc.perform(get("/api/coupons/{id}", coupon.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(coupon.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.start").value(DEFAULT_START.intValue()))
            .andExpect(jsonPath("$.end").value(DEFAULT_END.intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.intValue()))
            .andExpect(jsonPath("$.couponType").value(DEFAULT_COUPON_TYPE.toString()))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.price").value(DEFAULT_PRICE.doubleValue()))
            .andExpect(jsonPath("$.image").value(DEFAULT_IMAGE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingCoupon() throws Exception {
        // Get the coupon
        restCouponMockMvc.perform(get("/api/coupons/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCoupon() throws Exception {
        // Initialize the database
        couponRepository.saveAndFlush(coupon);

        int databaseSizeBeforeUpdate = couponRepository.findAll().size();

        // Update the coupon
        Coupon updatedCoupon = couponRepository.findById(coupon.getId()).get();
        // Disconnect from session so that the updates on updatedCoupon are not directly saved in db
        em.detach(updatedCoupon);
        updatedCoupon
            .title(UPDATED_TITLE)
            .start(UPDATED_START)
            .end(UPDATED_END)
            .amount(UPDATED_AMOUNT)
            .couponType(UPDATED_COUPON_TYPE)
            .message(UPDATED_MESSAGE)
            .price(UPDATED_PRICE)
            .image(UPDATED_IMAGE);
        CouponDTO couponDTO = couponMapper.toDto(updatedCoupon);

        restCouponMockMvc.perform(put("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isOk());

        // Validate the Coupon in the database
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeUpdate);
        Coupon testCoupon = couponList.get(couponList.size() - 1);
        assertThat(testCoupon.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testCoupon.getStart()).isEqualTo(UPDATED_START);
        assertThat(testCoupon.getEnd()).isEqualTo(UPDATED_END);
        assertThat(testCoupon.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCoupon.getCouponType()).isEqualTo(UPDATED_COUPON_TYPE);
        assertThat(testCoupon.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testCoupon.getPrice()).isEqualTo(UPDATED_PRICE);
        assertThat(testCoupon.getImage()).isEqualTo(UPDATED_IMAGE);
    }

    @Test
    @Transactional
    public void updateNonExistingCoupon() throws Exception {
        int databaseSizeBeforeUpdate = couponRepository.findAll().size();

        // Create the Coupon
        CouponDTO couponDTO = couponMapper.toDto(coupon);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restCouponMockMvc.perform(put("/api/coupons")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(couponDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Coupon in the database
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCoupon() throws Exception {
        // Initialize the database
        couponRepository.saveAndFlush(coupon);

        int databaseSizeBeforeDelete = couponRepository.findAll().size();

        // Get the coupon
        restCouponMockMvc.perform(delete("/api/coupons/{id}", coupon.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Coupon> couponList = couponRepository.findAll();
        assertThat(couponList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Coupon.class);
        Coupon coupon1 = new Coupon();
        coupon1.setId(1L);
        Coupon coupon2 = new Coupon();
        coupon2.setId(coupon1.getId());
        assertThat(coupon1).isEqualTo(coupon2);
        coupon2.setId(2L);
        assertThat(coupon1).isNotEqualTo(coupon2);
        coupon1.setId(null);
        assertThat(coupon1).isNotEqualTo(coupon2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CouponDTO.class);
        CouponDTO couponDTO1 = new CouponDTO();
        couponDTO1.setId(1L);
        CouponDTO couponDTO2 = new CouponDTO();
        assertThat(couponDTO1).isNotEqualTo(couponDTO2);
        couponDTO2.setId(couponDTO1.getId());
        assertThat(couponDTO1).isEqualTo(couponDTO2);
        couponDTO2.setId(2L);
        assertThat(couponDTO1).isNotEqualTo(couponDTO2);
        couponDTO1.setId(null);
        assertThat(couponDTO1).isNotEqualTo(couponDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(couponMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(couponMapper.fromId(null)).isNull();
    }
}
